import { ArticlesService } from './articles.service';

export class ArticlesModule {
    static async getArticles() {
        const res = (await ArticlesService.getArticles()).toDTO();
        return res;
    }
}
