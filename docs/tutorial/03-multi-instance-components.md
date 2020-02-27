# Multi-Instance Components

Redux Tools allow you to use the injection mechanism for generic multi-instance components too. This includes cool stuff like data grids, multi-step forms, and carousels.

Assume that you want to have multiple data grids mounted over a single page lifecycle, and you also want to store their state in Redux. To do that, you only need to write a reducer which manages the state of a single data grid, meaning that you never have to distinguish the individual data grids.

```js
// This reducer doesn't do anything, it has a static state.
const dataGridReducer = R.always({ data: [] });

const DataGrid = withReducers(dataGridReducer, {
	feature: 'grids',
})(DataGridPresenter);

const Example = () => <DataGrid namespace="DATA_GRID_1" />;
```

After the `<DataGrid namespace="DATA_GRID_1" />` element is mounted, `state.grids.DATA_GRID_1.data` will be an empty array. Any actions dispatched via `namespacedConnect` will only affect this data grid instance, same applies to `withEpics` and `withMiddleware`.

If you want to affect this data grid instance by Redux actions from the outside, you will need to associate these actions with its namespace (i.e. set their `meta.namespace` property). The recommended way to do this is to use the `attachNamespace` utility function from [@redux-tools/namespaces](/packages/namespaces?id=attachNamespace).
