import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    GoogleGenerativeAI,
    GoogleGenerativeAIFetchError,
} from '@google/generative-ai';

// Replace with your actual API key
const API_KEY = 'AIzaSyCWslVI1gMWRBaKSFE9SifzPl3Zpn-0dPQ';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

export const askAiQuestion = createAsyncThunk<string, string>(
    'interviews/askQuestion',
    async (content: string, thunkAPI) => {
        try {
            const result = await model.generateContent(content);
            const response = await result.response;
            const text = await response.text();
            return text;
        } catch (error: unknown) {
            if (error instanceof GoogleGenerativeAIFetchError) {
                return thunkAPI.rejectWithValue(error.message);
            }
            throw error;
        }
    }
);

export const askAiForReview = createAsyncThunk<string, string>(
    'interviews/askForReview',
    async (content: string, thunkAPI) => {
        try {
            const result = await model.generateContent(content);
            const response = await result.response;
            const text = await response.text();
            return text;
        } catch (error: unknown) {
            if (error instanceof GoogleGenerativeAIFetchError) {
                return thunkAPI.rejectWithValue(error.message);
            }
            throw error;
        }
    }
);
