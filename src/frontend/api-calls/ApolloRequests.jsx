import { gql } from "@apollo/client"

export const GET_TASKS = gql`
  query GetTasksQuery{
    tasks{
      id
      description
      done
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id)
  }
`

export const UPDATE_DESCRIPTION = gql`
  mutation UpdateDescriptionMutation($id: Int!, $description: String!) {
    updateDescription(id: $id, description: $description)
  }
`

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($description: String!) {
      createTask(description: $description)
  }
`

export const UPDATE_STATUS = gql`
  mutation UpdateStatusMutation($id: Int!) {
    updateStatus(id: $id)
  }
`