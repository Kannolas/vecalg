/* eslint-disable no-cond-assign */
/* eslint-disable no-nested-ternary */
import { Typography } from '@plex-inc/bricks/components';

import { Box } from '@/shared/ui/box';
import { AnimatedVector } from '@/shared/ui/animated-vector';
import { Formula } from '@/shared/ui/formula';
import { VectorScene } from '@/shared/ui/animated-scene/ui/animated-scene';

import styles from '../styles/articleComponent.module.css';
import { Block } from '../../../../trpc/router/chains copy/articles.types';

interface ArticleData {
    title: string | null;
    blocks?: Block[] | null;
}

const renderLine = (line: string, idx: number) => {
    // Делим по формату: `...` или //... (формула)
    const regex = /(`([^`]+)`)|(\/\/([^\s]+))/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(line)) !== null) {
        // Добавляем обычный текст ДО матча
        if (match.index > lastIndex) {
            parts.push(<span key={`${idx}-${lastIndex}`}>{line.slice(lastIndex, match.index)}</span>);
        }

        if (match[1]) {
            // Это `...`
            parts.push(
                <span key={`${idx}-color-${match.index}`} className={styles.Text_bold}>
                    {match[2]}
                </span>,
            );
        } else if (match[3]) {
            // Это //...
            parts.push(<Formula key={`${idx}-formula-${match.index}`} formula={match[4]} />);
        }

        lastIndex = regex.lastIndex;
    }

    // Добавляем остаток строки
    if (lastIndex < line.length) {
        parts.push(<span key={`${idx}-end`}>{line.slice(lastIndex)}</span>);
    }

    return parts;
};

const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => <div key={idx}>{renderLine(line, idx)}</div>);
};

export const ArticleComponent = ({ data }: { data: ArticleData }) => {
    console.log(data);

    return (
        <div className={styles.article}>
            <Typography.Text size="text_display_2" className={styles.article_title}>
                {data.title}
            </Typography.Text>
            {data.blocks?.map((block, idx) => {
                const scenes =
                    block.svgData?.length &&
                    block.svgData?.length > 0 &&
                    block.svgData?.filter((item) => item.startZ !== undefined);
                const vectors =
                    block.svgData?.length &&
                    block.svgData?.length > 0 &&
                    block.svgData?.filter((item) => item.startZ === undefined);

                return (
                    <Box key={idx} title={block?.title || ''} className={styles.article_box}>
                        <Typography.Text size="text_m">{renderContent(block?.content || '')}</Typography.Text>
                        {vectors && vectors.length > 0 && (
                            <div className={styles.article_svg}>
                                <AnimatedVector
                                    vectors={vectors.map((vec) => ({
                                        ...vec,
                                        vectorLabel: vec.vectorLabel ? (
                                            <Formula formula={vec.vectorLabel} />
                                        ) : undefined,
                                    }))}
                                />
                            </div>
                        )}
                        {scenes && scenes.length > 0 && (
                            <VectorScene
                                vectors={[
                                    {
                                        start: [scenes[0]?.startX || 0, scenes[0].startY || 0, scenes[0].startZ || 0],
                                        end: [
                                            scenes[0].animationEndX || 0,
                                            scenes[0].animationEndY || 0,
                                            scenes[0].animationEndZ || 0,
                                        ],
                                    },
                                ]}
                            />
                        )}
                    </Box>
                );
            })}
        </div>
    );
};
