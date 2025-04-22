import React from 'react'
import TodoList from './components/TodoList.jsx'
import Task from './components/Task.jsx'
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TASK_MUTATION, GET_TASKS,  } from './api-calls/ApolloRequests.jsx';
import api from './api-calls/AxiosRequest.jsx';
import { Button } from '@/components/ui/button.jsx';

function App() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  const [createTask, {}] = useMutation(CREATE_TASK_MUTATION, {
    onCompleted: () => {refetch()},
    onError: (errorData) => {console.log(errorData)}
  })

  const generateTask = async () => {
    try {
      await api.post("/generate_task")
      refetch()
    }catch (error) {
      console.error("Error generating task ", error)
    }
  }

  if (loading)
    return null

  if (error)
    return "Error " + error

  let numTasks
  if (data) {
    numTasks = data.tasks.length
  }

  let displayTask
  let generate_button = undefined
  if (numTasks) {
    displayTask = <TodoList/>
    generate_button = <Button onClick={generateTask} className="ml-2" >Generate Task</Button>
  }else {
    displayTask = <p className="w-full text-center py-2 px-4 mb-4 rounded">
      No tasks have been created...
    </p>
  }
  
  return (
    <div className="min-h-screen bg-gray-1000 flex flex-col items-center justify-center">
      <main className="w-2/5">
        <header className="text-center py-4 bg-blue-500 text-white mb-4 text-2xl font-bold">
          My Todo List
        </header>
        {displayTask}
        <Task task={undefined} createTask={createTask}/>
        {generate_button}
      </main>
    </div>
  )
}

export default App
