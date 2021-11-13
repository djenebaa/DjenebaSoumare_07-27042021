import { GET_POSTS,
        UPDATE_POST,
        DELETE_POST,
        EDIT_COMMENT,
        GET_COMMENTS,

} from "../actions/post.actions";

const initialState = {};

export default function postReducer (state = initialState, action) {
    switch (action.type) {
      case GET_POSTS:
        return action.payload;
    
         case UPDATE_POST:
          return state.map((post) => {
            if (post.id === action.payload.postId) {
              return {
                ...post,
                post_name: action.payload.post_name,
              };
            } else return post;
          }); 
          case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
      case GET_COMMENTS:
        return action.payload;
    
       case EDIT_COMMENT:
        return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        } else return post;
        })
          default:
         return state;
    }
}