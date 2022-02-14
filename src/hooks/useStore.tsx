import { createContext, useContext, useReducer } from 'react';
import { APIResponse, InitialState } from '../utils/types';

export const StateContext = createContext<InitialState | null>(null);

//initial state
const initialState: InitialState = {
  movies: [],
  series: [],
  moviePageInfo: 1,
};

//actions
export function fetchMovie(payload: APIResponse) {
  return { type: 'FETCH_MOVIE', payload };
}

//reducer
export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'FETCH_MOVIE':
      // console.log([...state.movies, ...action.payload.results], 'dari store');
      return {
        ...state,
        movies: [...state.movies, ...action.payload.results],
        moviePageInfo: action.payload.page,
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
