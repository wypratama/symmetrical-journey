import { createContext, useContext, useReducer } from 'react';
import { APIResponse, IMovie, InitialState, ISeries } from '../utils/types';

export const StateContext = createContext<InitialState | null>(null);

//initial state
const initialState: InitialState = {
  movies: [],
  series: [],
  moviePageInfo: 1,
  seriesPageInfo: 1,
};

//actions
export function fetchMovie(payload: APIResponse<IMovie>) {
  return { type: 'FETCH_MOVIE', payload };
}

export function fetchSeries(payload: APIResponse<ISeries>) {
  return { type: 'FETCH_SERIES', payload };
}

//reducer
export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'FETCH_MOVIE':
      return {
        ...state,
        movies: [...state.movies, ...action.payload.results],
        moviePageInfo: action.payload.page,
      };
    case 'FETCH_SERIES':
      console.log([...state.series, ...action.payload.results]);
      return {
        ...state,
        series: [...state.series, ...action.payload.results],
        seriesPageInfo: action.payload.page,
      };
    default:
      return state;
  }
}

export function StateProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState),
    stateData = { state, dispatch };
  return <StateContext.Provider value={stateData} {...props} />;
}

export function useStateContext() {
  return useContext(StateContext) as unknown as {
    state: InitialState;
    dispatch: any;
  };
}
