import { addTodo, removeTodo, switchTodo } from "../api/todos";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "./keys.constans";

export const useTodosQuery = () => {
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation(addTodo, {
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries(QUERY_KEY.TODOS);
    },
  });

  const removeTodoMutation = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.TODOS);
    },
  });

  const switchTodoMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return {
    addTodo: addTodoMutation.mutate,
    removeTodo: removeTodoMutation.mutate,
    switchTodo: switchTodoMutation.mutate,
  };
};
