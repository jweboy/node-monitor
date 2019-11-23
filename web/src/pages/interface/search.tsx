// import * as React from 'react';
// import { Input, Button } from 'antd';
// import { FilterDropdownProps } from 'antd/lib/table';
// import useFilters from './use-filters.ts';
// // import { usePrevious } from '../../../utils/state';
// // import { useFilters } from '../../../state/interface';
// // import { VoidFunc, Filters } from '../../../types/interface';

// const initialKeyword: string = '';


// // 自定义搜索组件
// function Search({
//   selectedKeys,
//   setSelectedKeys,
//   clearFilters,
//   confirm,
// }: FilterDropdownProps): React.ReactElement {
//   const [keyword, setKeyword] = React.useState(initialKeyword);
//   // useFilters({ keyword });

//   // 重置
//   function handleReset(clearFilters: Function) {
//     return () => {
//       clearFilters();
//     };
//   }

//   // 输入框监听
//   function onChange(setSelectedKeys: Function) {
//     return (evt: React.SyntheticEvent) => {
//       const target = evt.target as HTMLInputElement;
//       setSelectedKeys(target.value ? target.value : '');
//     };
//   };

//     // 搜索
//   function handleSearch(selectedKeys: string, confirm: Function) {
//     return () => {
//       // setKeyword(selectedKeys);
//       confirm();
//     };
//   }

//   // React.useEffect(() => {
//   //   console.warn('keyword =>', keyword);
//   //   // console.warn('filters =>', filters);
//   //   // useFilters({ keyword });
//   // }, [keyword]);

//   return (
//     <div className="search">
//       <Input
//         placeholder="请输入请求地址关键词"
//         value={keyword}
//         onPressEnter={handleSearch(selectedKeys, confirm)}
//         onChange={onChange(setSelectedKeys)}
//         className="search-input"
//       />
//       <Button
//         type="primary"
//         icon="search"
//         size="small"
//         className="search-btn"
//         onClick={handleSearch(selectedKeys, confirm)}
//       >
//         Search
//       </Button>
//       <Button size="small" className="search-btn" onClick={handleReset(clearFilters)}>
//         Reset
//       </Button>
//     </div>
//   );
// }

// export default Search;
