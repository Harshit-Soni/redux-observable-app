import { Epic, combineEpics, ofType } from "redux-observable"
import { concatAll, switchMap } from "rxjs/operators"

import { CounterAction } from "./counterSlice"
import { fetchCount } from "../../app/serviceAPI";

const fetchCountEpic: Epic = (actions$, store) =>
  actions$.pipe(
    ofType(CounterAction.asyncIncrementByAmount),
    // we use switchMap for sequential api calls/actions return karna
    switchMap(async ({payload}): Promise<{type: string}[]> => {
      try {
        const response = await fetchCount(payload);
        const results = [CounterAction.asyncIncrementByAmountSuccess(response.data)]
        return results
      } catch (error) {
        return [CounterAction.asyncIncrementByAmountFailed()]
      }
    }),
    concatAll()
  )

export const CounterEpics = combineEpics(
  fetchCountEpic
)

