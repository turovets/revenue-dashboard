import { useEffect, useMemo, useState } from 'react';

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

  const tData = useMemo(() => data.reduce<{x: string[], y: number[]}>((acc, curr) => {
    acc.x.push(curr.category_name);
    acc.y.push(valueTypeFilter === ValueType.Revenues ? curr.total_revenue : curr.total_margin);
    return acc;
  }, { x: [], y: [] }), [data, valueTypeFilter]);

  return (
    <>
      <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} />
      <Report title="Total Revenues Per Products Categories" type={ReportType.Bar} data={tData} />
    </>
  )
}

export default CategoriesRevenues;
