import { Loan } from './Loan';

export const LOAN_DATA_LIST: Loan[] = [
  {
    id: 1,
    client: { id: 1, name: 'Cliente 1' },
    game: {
      id: 1,
      title: 'Juego 1',
      age: 6,
      category: { id: 1, name: 'Categoría 1' },
      author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' },
    },
    startDate: new Date(2023, 1, 2),
    endDate: new Date(2023, 1, 12),
  },
  {
    id: 2,
    client: { id: 2, name: 'Cliente 2' },
    game: {
      id: 2,
      title: 'Juego 2',
      age: 10,
      category: { id: 2, name: 'Categoría 2' },
      author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' },
    },
    startDate: new Date(2023, 2, 15),
    endDate: new Date(2023, 3, 5),
  },
  {
    id: 3,
    client: { id: 3, name: 'Cliente 3' },
    game: {
      id: 3,
      title: 'Juego 3',
      age: 12,
      category: { id: 3, name: 'Categoría 3' },
      author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' },
    },
    startDate: new Date(2023, 4, 20),
    endDate: new Date(2023, 5, 1),
  },
  {
    id: 4,
    client: { id: 4, name: 'Cliente 4' },
    game: {
      id: 4,
      title: 'Juego 4',
      age: 3,
      category: { id: 4, name: 'Categoría 4' },
      author: { id: 4, name: 'Autor 4', nationality: 'Nacionalidad 4' },
    },
    startDate: new Date(2022, 7, 15),
    endDate: new Date(2022, 7, 20),
  },
  {
    id: 5,
    client: { id: 5, name: 'Cliente 5' },
    game: {
      id: 5,
      title: 'Juego 5',
      age: 8,
      category: { id: 5, name: 'Categoría 5' },
      author: { id: 5, name: 'Autor 5', nationality: 'Nacionalidad 5' },
    },
    startDate: new Date(2021, 5, 10),
    endDate: new Date(2021, 5, 15),
  },
  {
    id: 6,
    client: { id: 6, name: 'Cliente 6' },
    game: {
      id: 6,
      title: 'Juego 6',
      age: 12,
      category: { id: 6, name: 'Categoría 6' },
      author: { id: 6, name: 'Autor 6', nationality: 'Nacionalidad 6' },
    },
    startDate: new Date(2021, 5, 10),
    endDate: new Date(2021, 5, 15),
  },
];
