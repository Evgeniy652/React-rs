import { rest } from 'msw';
import data from '../../assets/data.json';

const path = 'https://rickandmortyapi.com/api/character';

export const fetchTasks_some_cards_response = rest.get(path, async (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(data), ctx.cookie('MSW_COOKIE_STORE', null));
});

export const fetchTasks_empty_response = rest.get(path, async (req, res, ctx) => {
  return res(ctx.status(200), ctx.json({}));
});

export const handlers = [fetchTasks_empty_response, fetchTasks_some_cards_response];
