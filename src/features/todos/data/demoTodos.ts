import type { Todo } from '../types/todo'

export const demoTodos: Todo[] = [
  { content: '오늘 꼭 해야 할 일\n중요한 목표 세 가지 정하기', completed: true },
  { content: '집중해서 30분 독서하기\n마음에 남는 문장 기록하기', completed: false },
  { content: '점심 먹고 가볍게 산책하기\n햇빛 보면서 잠깐 쉬기', completed: false },
  { content: '밀린 메일 확인하고\n필요한 답장 보내기', completed: true },
  { content: '진행 중인 프로젝트\n다음 작업 정리하기', completed: false },
  { content: '물 한 잔 마시고\n어깨와 목 스트레칭하기', completed: true },
  { content: '이번 주 장보기 목록\n냉장고 확인하며 적어두기', completed: false },
  { content: '하루를 마무리하며\n오늘 잘한 일 하나 기록하기', completed: false },
].map((todo, index) => ({
  ...todo,
  id: -(index + 1),
  createdAt: '2026-11-20T00:00:00.000Z',
  updatedAt: '2026-11-20T00:00:00.000Z',
}))
