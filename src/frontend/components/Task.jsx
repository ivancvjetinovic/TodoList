import { Button } from "@/components/ui/button"
import { CiEdit } from "react-icons/ci";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Task({task, isTodoList, createTask, updateDescription, deleteTask}) {

  let id = undefined
  let description = ""
  if (!(task === undefined)) {
    ({id, description } = task)
  }

  const [newTaskDescription, setNewTaskDescription] = useState(description)

  function handleChange(event) {
    setNewTaskDescription(event.target.value)
  }

  function saveTask() {
    if (isTodoList) {
      updateDescription({variables: {id: id, description: newTaskDescription}})
    }else {
      createTask({variables: {description: newTaskDescription}})
    }
  }

  let title
  let trash_task
  if (isTodoList) {
    title = <div onClick={handleChange} className="cursor-pointer" >
      <CiEdit/>
    </div>
    trash_task = <DialogClose asChild>
      <Button onClick= {() => isTodoList && deleteTask({variables: {id: id}})} >
        Throw in Trash
      </Button>
    </DialogClose>
  }else {
    title = <Button variant="outline">Create Task</Button>
    trash_task = undefined
  } 

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {title}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Please provide a description for the task.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                id="link"
                defaultValue={description}
                onChange={handleChange}
              />
            </div>
          </div> 
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={saveTask}>
                Save Task
              </Button>
            </DialogClose>
            {trash_task}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    
  )
}
