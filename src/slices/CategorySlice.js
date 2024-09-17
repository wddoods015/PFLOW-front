import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 전체 포스트를 가져오는 비동기 액션
export const fetchAllPosts = createAsyncThunk(
  'category/fetchAllPosts',
  async () => {
    const response = await axios.get('http://localhost:5000/api/boards');
    return response.data;
  }
);

// 비동기 액션 (Thunk): 카테고리 데이터 가져오기
export const fetchCategoryPost = createAsyncThunk(
  'category/fetchCategoryPost',
  async (tag) => {
    const response = await axios.get(`http://localhost:5000/api/boards/${tag}`);
    return response.data;
  }
);

// 슬라이스 정의
const CategorySlice = createSlice({
  name: 'category',
  initialState: {
    selectedTag: '# 전체', // 전체 태그를 기본값으로 설정
    categoryData: [], // 빈 배열로 초기화
    allPosts: [], // 빈 배열로 초기화
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedTag: (state, action) => {
      state.selectedTag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategoryPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryPost.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategoryPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedTag } = CategorySlice.actions;
export default CategorySlice.reducer;
