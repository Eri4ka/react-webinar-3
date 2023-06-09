const initialState = {
  data: [],
  countComments: 0,
  waiting: false,
  activeParentId: '',
  errorMessage: ''
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: [], countComments: 0, waiting: true, errorMessage: ''};

    case "comments/load-success":
      return { 
        ...state, 
        data: action.payload.data.items, 
        countComments: action.payload.data.count, 
        waiting: false
      };
ƒ
    case "comments/load-error":
      return { ...state, data: [], countComments: 0, waiting: false};

    case "comments/create-start":
      return { ...state, waiting: true, errorMessage: '' };;

    case "comments/create-success":
      return { 
        ...state, 
        data: [...state.data, action.payload.data], 
        countComments: state.countComments + 1, 
        waiting: false
      };

    case "comments/create-error":
      return { ...state, waiting: false, errorMessage: action.payload.data };

    case "comments/set-active-parentId":
      return { ...state, activeParentId: action.payload.parentId };

    default:
      return state;
  }
}

export default reducer;
