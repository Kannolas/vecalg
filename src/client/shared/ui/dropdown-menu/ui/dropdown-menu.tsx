import { useState } from 'react';
import Image from 'next/image';
import { Dropdown, DropdownPanel, DropdownTrigger, Input, MenuItem, Typography } from '@plex-inc/bricks/components';
import cn from 'classnames';

import styles from '../style/dropdown-menu.module.css';
import { nullable } from '../../../utils/nullable';

const backgroundMap = {
    layer: styles.Dropdown__input_layer,
    background: styles.Dropdown__input_background,
};

export interface Option {
    value: string;
    text: string;
    icon?: string;
    description?: string;
}

type DropdownTypeBase<T> = {
    placeholder?: string;
    search?: boolean;
    className?: string;
    view?: keyof typeof backgroundMap;
    onlyIcon?: boolean;
    options: T[];
};

type DropdownType<T> = {
    value: T;
    onChange: (value: T) => void;
    multiple?: never;
};

type DropdownTypeMultiple<T, M> = {
    value: T[];
    onChange: (value: T[]) => void;
    multiple?: M;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMultiple<T, M>(rest: any): rest is DropdownTypeMultiple<T, M> {
    return 'multiple' in rest;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSingle<T>(rest: any): rest is DropdownType<T> {
    const hasMultiple = 'multiple' in rest;
    return !hasMultiple;
}

export const DropdownMenu = <T extends Option, M>({
    placeholder,
    options,
    search,
    className,
    onlyIcon,
    view = 'background',
    ...rest
}: DropdownTypeBase<T> & (M extends true ? DropdownTypeMultiple<T, M> : DropdownType<T>)) => {
    const values = (Array.isArray(rest.value) ? rest.value : [rest.value]).filter(Boolean);
    const valuesMap = values.reduce<Record<string, true>>((acc, cur) => {
        acc[cur.value] = true;
        return acc;
    }, {});
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const getOptionValue = () => {
        if (values.length === 0) return placeholder;
        return (
            <div className={styles.Dropdown__select}>
                {nullable(
                    rest.multiple,
                    () =>
                        values?.map((obj) => (
                            <div className={styles.Dropdown__select_box} key={obj.value}>
                                <Typography.Text className={styles.Dropdown__select_item}>{obj.text}</Typography.Text>
                            </div>
                        )),
                    values?.map((obj) => (
                        <div className={styles.Dropdown__select_value} key={obj.value}>
                            {obj?.icon && <Image alt="" src={obj?.icon} width={24} height={24} />}
                            <Typography.Text
                                className={cn(styles.Dropdown__select_item, styles.text_primary)}
                                strong
                                size="text_l"
                            >
                                {obj.text}
                            </Typography.Text>
                        </div>
                    )),
                )}
            </div>
        );
    };

    const handleChange = (data: T) => {
        if (isMultiple(rest)) {
            const v = valuesMap[data.value] ? values.filter((obj) => obj.value !== data.value) : [...values, data];
            rest.onChange(v);
            return;
        }

        if (isSingle(rest)) {
            rest.onChange(data);
        }
    };

    return (
        <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} arrow>
            <DropdownTrigger
                className={`${className} ${styles.Dropdown__trigger} ${backgroundMap[view]}`}
                style={{ justifyContent: 'space-between' }}
                size="l"
                variant="background"
                onClick={() => setIsOpen(true)}
            >
                {!onlyIcon && <Typography.Text as="div">{getOptionValue() || ''}</Typography.Text>}
            </DropdownTrigger>
            <DropdownPanel className={`${className} ${styles.Dropdown__panel} ${styles.Dropdown__trigger}`}>
                {search && (
                    <div className={styles.Dropdown__input}>
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            variant="layer"
                            placeholder="Поиск..."
                        />
                    </div>
                )}
                {options
                    ?.filter((i) => i.text.toLowerCase().includes(searchQuery.toLowerCase()))
                    ?.map((item, index) => (
                        <MenuItem
                            onClick={() => {
                                handleChange(item);
                                setIsOpen(false);
                            }}
                            className={cn(styles.Dropdown__item, {
                                [styles.Dropdown__item_active]: valuesMap[item.value],
                            })}
                            key={index}
                        >
                            {item?.icon && <Image alt="" src={item?.icon} width={20} height={20} />}
                            <div className={styles.Dropdown__item_box}>
                                <Typography.Text>{item?.text}</Typography.Text>
                                {nullable(item.description, () => (
                                    <Typography.Text size="text_xs" className={styles.text_secondary}>
                                        {item?.description}
                                    </Typography.Text>
                                ))}
                            </div>
                        </MenuItem>
                    ))}
            </DropdownPanel>
        </Dropdown>
    );
};
