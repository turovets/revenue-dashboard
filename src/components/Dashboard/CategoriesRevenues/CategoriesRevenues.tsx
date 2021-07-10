import { useEffect, useState } from 'react';

import Report, { ReportType } from '../../Report/Report';
import {  ValueType } from '../types';
import Switcher from '../../shared/Switcher/Switcher';
import {
  ProductCategoryService,
  TProductCategoriesRevenues
} from '../../../services/productCategories/ProductCategoryService';

const CategoriesRevenues = () => {
  const [data, setData] = useState<TProductCategoriesRevenues[]>([]);
  const [valueTypeFilter, setValueTypeFilter] = useState<ValueType>(ValueType.Revenues);

  useEffect(() => {
    ProductCategoryService.getProductCategoriesRevenues().then(setData);
  }, [])

  const tData = data.map((i) => ({
    name: i.category_name,
    value: valueTypeFilter === ValueType.Revenues ? i.total_revenue : i.total_margin,
  }))

  return (
    <>
      <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} />
      <Report title="Revenues By Categories" type={ReportType.Bar} data={tData} />
    </>
  )
}

export default CategoriesRevenues;
