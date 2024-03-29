import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import photoService from '../services/photoService';
import { useAuth } from '../hooks/useAuth';

const initialState = {
  activePhoto: null,
  photos: [],
  photo: null,
  error: false,
  success: false,
  loading: false,
  message: null
};

export const publishPhoto = createAsyncThunk(
  'photo/publish',
  async ([photo, callback], thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.publishPhoto(photo, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    callback(data)
    return data;
  }
);
export const getUserPhotos = createAsyncThunk(
  'photo/userPhotos',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const deletePhoto = createAsyncThunk(
  'photo/delete',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);
export const deleteComment = createAsyncThunk(
  'comment/delete',
  async ({ id, photoId }, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.deleteComment(id, photoId, token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const updatePhoto = createAsyncThunk(
  'photo/update',
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getPhoto = createAsyncThunk(
  'photo/getPhoto',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhoto(id, token);

    return data;
  }
);

export const like = createAsyncThunk('like/photo', async (id, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;

  const data = await photoService.like(id, token);

  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

export const comment = createAsyncThunk(
  'photo/comment',
  async (commnetData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const postId = commnetData.id;
    const data = await photoService.comment(
      { comment: commnetData.comment },
      postId,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return [postId, data];
  }
);

export const getPhotos = createAsyncThunk('photo/get', async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.user.token;
  const data = await photoService.getPhotos(token);
  return data;
});

export const searchPhotos = createAsyncThunk(
  'photo/search',
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.searchPhotos(query, token);
    return data;
  }
);

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetMessage: state => {
      state.message = null;
    },
    setPhoto: (state, { payload }) => {
      state.photo = payload;
    },
    setActivePhoto: (state, { payload }) => {
      state.activePhoto = payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(publishPhoto.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(publishPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photo = action.payload;
        state.photos.unshift(state.photo);
        state.message = 'Foto publicada com sucesso';
      })
      .addCase(publishPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = null;
      })
      .addCase(getUserPhotos.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        let commentId = action.payload.id;

        state.photos = state.photos.map(photo => {
          const commentIds = (photo?.comments ?? []).map(comment => comment.id);
          if (!commentIds.includes(commentId)) return photo;

          return {
            ...photo,
            comments: photo.comments.filter((comment) => comment.id !== commentId)
          };
        });
      })
      .addCase(deletePhoto.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = state.photos.filter(photo => {
          return photo._id !== action.payload.id;
        });
        state.message = action.payload.message;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = null;
      })
      .addCase(updatePhoto.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos.map(photo => {
          if (photo._id === action.payload.photo._id) {
            photo.title = action.payload.photo.title;
            return photo
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(updatePhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.photo = null;
      })
      .addCase(getPhoto.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        const isAlreadyInList = state.photos.findIndex(photo => photo._id === action.payload._id) > -1
        if (isAlreadyInList) {
          state.photos = state.photos.map((photo) => {
            if (photo._id === action.payload._id) {
              return action.payload
            }
            return photo
          })
        } else {
          state.photos = [
            ...state.photos,
            action.payload
          ]
        }
        // state.photo = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        // if (state.photos.likes) {
        //   state.photos.likes = action.payload.likes;
        // }


         state.photos = state.photos.map(photo => {
          if (photo._id === action.payload.photoId) {
            photo.likes = action.payload.likes;
            return photo;
          }
          return photo;
        });
        state.message = action.payload.message;
      })
      .addCase(like.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(comment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        const [photoId, { comment }] = action.payload;
        state.photos = state.photos.map((photo) => {
          if (photo._id === photoId) {
            return {
              ...photo,
              comments: [
                ...photo.comments,
                comment
              ]
            };
          }
          return photo;
        });

        // state.photo?.comments?.push(comment);
        state.message = action.payload.message;
      })
      .addCase(comment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPhotos.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      })
      .addCase(searchPhotos.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.photos = action.payload;
      });
  }
});

export const { resetMessage, setPhoto, setActivePhoto } = photoSlice.actions;
export default photoSlice.reducer;
