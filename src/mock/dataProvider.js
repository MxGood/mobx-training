import { categoryNormalizer } from './normalizer';
import categoryTree from 'json!./categoryTree.json';
import taskListData from 'json!./taskArray.json';

const categoryListData = categoryNormalizer(categoryTree);

// const array = categoryDenormalizer(categoryList);
// console.log('denormalize = ', array);

export default { categoryListData, taskListData };