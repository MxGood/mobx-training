export function categoryNormalizer(tree) {

    let categoryList = [];

    function categoryNormalizer(tree, parentId = null) {
        tree.forEach(function (item) {
            item.parentId = parentId;
            item.expanded = false;
            categoryList = [...categoryList, item];
            if (item.children) {
                categoryNormalizer(item.children, item.categoryId);
                delete item.children;
            }
        });
    }

    categoryNormalizer(tree);
    return categoryList;
}

export function categoryDenormalizer(array) {
    array.forEach(function (item) {
        item.children = array.filter((child) => (child.parentId === item.categoryId));
        removeProperties(item.children);
    });
    const tree = array.filter((item) => (item.parentId === null));
    removeProperties(tree);
    return tree;
}

function removeProperties(array) {
    array.forEach(function (element) {
        delete element.generation;
        delete element.parentId;
    });
    return array;
}