import { createHttpClient } from '../../create-http-client';
import { getError } from '../../utils/get-error';

import { ChainsModel } from './articles.model';
import { Articles } from './articles.types';

const http = createHttpClient({ baseURL: process.env.EXCHANGER_PATH, context: 'CHAINS' });

export class ArticlesService {
    static async getArticles() {
        try {
            const { data } = await http.get<any>('/articles');
            return ChainsModel.fromDTO(data);
        } catch (err) {
            return ChainsModel.Error(getError(err));
        }
    }
}
