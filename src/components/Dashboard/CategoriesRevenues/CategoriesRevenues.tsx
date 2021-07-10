import { useEffect, useMemo, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ProductCategoryService.getProductCategoriesRevenues().then((res) => {
      setData(res);
      setIsLoading(false);
    }).catch(console.log);
  }, [])

  const tData = useMemo(() => data.reduce<{x: string[], y: number[]}>((acc, curr) => {
    acc.x.push(curr.category_name);
    acc.y.push(valueTypeFilter === ValueType.Revenues ? curr.total_revenue : curr.total_margin);
    return acc;
  }, { x: [], y: [] }), [data, valueTypeFilter]);

  return (
    <div className="Dashboard-component-wrapper">
      {isLoading && <LinearProgress className="Dashboard-progress" />}
      <div className="Dashboard-filters">
        <Switcher onChangeHandler={setValueTypeFilter} activeItem={valueTypeFilter} items={Object.values(ValueType)} disabled={isLoading} /><div/>
      </div>
      <Report title="Total Revenues Per Products Categories" type={ReportType.Bar} data={tData} />
    </div>
  )
}

export default CategoriesRevenues;
