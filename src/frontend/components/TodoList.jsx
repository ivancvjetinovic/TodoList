import Task from "./Task.jsx"
import { Checkbox } from "@/components/ui/checkbox"
import { useMutation, useQuery, } from '@apollo/client';
import { GET_TASKS, UPDATE_DESCRIPTION, DELETE_TASK, UPDATE_STATUS  } from "../api-calls/ApolloRequests.jsx";

export default function TodoList({}) {
  const { loading, error, data, refetch} = useQuery(GET_TASKS, {
    onCompleted: (queryData) => {
      console.log(queryData)
    }
  });

  const [updateDescription, {}] = useMutation(UPDATE_DESCRIPTION, {
    onCompleted: () => {refetch()},
    onError: (errorData) => {console.log(errorData)}
  })

  const [deleteTask, {}] = useMutation(DELETE_TASK, {
    onCompleted: () => {refetch()},
    onError: (errorData) => {console.log(errorData)}
  })
  
  const [updateStatus, {}] = useMutation(UPDATE_STATUS, {
    onCompleted: () => {refetch()},
    onError: (errorData) => {console.log(errorData)}
  })

  if (loading)
    return null

  if (error)
    return "Error " + error

  if (data) {
    console.log(data)
    return (
      <>
        { data.tasks.map((task, index) => {
          let textStyle = `${task.done && "line-through "}w-full text-left py-2 px-4 mb-4 rounded`
          return (
            <div className="container mx-auto p-4 flex items-center">
              <div className="text-left bg-blue-100 p-2" >
                <Task
                  key={index}
                  isTodoList
                  task={task}
                  updateDescription={updateDescription}
                  deleteTask={deleteTask}/>
              </div>
              <div className="flex items-center justify-center ml-1 mr-1 rounded">
                <Checkbox checked={task.done} onCheckedChange={() => updateStatus({variables: {id: task.id}})} />
              </div>
              <div className="flex-grow bg-gray-500 text-white rounded">
                <p className={textStyle}>{task.description}</p>
              </div>
            </div>
          )})
        }
      </>    
    );
  }
  
  
}
