export interface Board {
  id: string;
  title: string;
  description: string;
}

export type BoardList = Array<Board>

export type BoardBody = Omit<Board, 'id'>;

export type TRemoveConf = {
  id: string,
}

export interface ModalState {
  isOpen: boolean;
  type: 'board' | 'column' | 'task';
}