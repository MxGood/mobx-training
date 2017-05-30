import { computed, observable, action } from 'mobx';
import data from '../mock/dataProvider'

class Category {
    @observable title;
    @observable completed;
    @observable expanded;

    constructor(title, parentId = null) {
        this.title = title;
        this.categoryId = Date.now();
        this.parentId = parentId;
        this.generation = null;
        this.completed = false;
        this.expanded = false;
    }
}

export class CategoryStore {
    @observable categories = [];
    @observable allCategories = [];
    @observable selectedCategory = null;

    @action create(title, parentId) {
        this.allCategories = [new Category(title, parentId), ...this.allCategories];
    }

    update(title, id) {
        const category = this.categories.find(category => category.categoryId === id);
        category.title = title;
    }

    getById(id) {
        return this.categories.find(category => category.categoryId === id);
    }

    remove(id) {
        this.allCategories = [...this.allCategories.filter(category => category.categoryId !== id)];
        this.removeChildren(id);
        this.showCategoryList();
    }

    removeChildren(id) {
        const children = this.allCategories.filter(category => category.parentId === id);
        if (children) {
            children.forEach(cat => {
                this.removeChildren(cat.categoryId);
                this.allCategories = [...this.allCategories.filter(cat => cat.categoryId !== id)];
            });
        }
    }

    getChildren(array, parentId) {
        return array.filter(item => item.parentId === parentId);
    }

    goInside(array, parent) {
        if (parent.expanded) {
            this.getChildren(array, parent.categoryId).forEach(item => {
                item.generation = parent.generation + 1;
                this.categories = [...this.categories, item];
                this.goInside(array, item)
            });
        }
    }

    getCategoryList() {
        this.allCategories.forEach(item => {
            if (!item.parentId) {
                item.generation = 0;
                this.categories = [...this.categories, item];
                this.goInside(this.allCategories, item);
            }
        });
    }

    showCategoryList() {
        this.categories = [];
        this.getCategoryList();
    }

    loadCategoryList() {
        this.allCategories = data.categoryListData;
        this.showCategoryList();
    }

    selectCategory(id) {
        this.selectedCategory = id;
    }
}

export default new CategoryStore;