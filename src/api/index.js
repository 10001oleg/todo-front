const baseUrl = "http://localhost:4000/api";

export const api = Object.freeze({
  signUp: async data => {
    const response = await fetch(`${baseUrl}/v1/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(`register failed: ${message}`);
    }
  },
  signIn: async data => {
    const { email, password } = data;
    const response = await fetch(`${baseUrl}/v1/auth/login`, {
      method: "POST",
      headers: {
        authorization: `Basic ${btoa(`${email}:${password}`)}`
      }
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(`login failed: ${message}`);
    }

    const { data: token } = await response.json();

    if (!token) {
      throw new Error(`server does not return any token`);
    }

    return token;
  },
  readTodos: async token => {
    const response = await fetch(`${baseUrl}/v2/todos`, {
      method: "GET",
      headers: {
        "x-token": token
      }
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(`read failed: ${message}`);
    }

    const { data: todos } = await response.json();

    return todos;
  },
  createTodo: async (token, body) => {
    const response = await fetch(`${baseUrl}/v2/todos`, {
      method: "POST",
      headers: {
        "x-token": token,
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(`create failed: ${message}`);
    }

    const { data: todo } = await response.json();

    return todo;
  },
  updateTodo: async (todoId, token, body) => {
    const response = await fetch(`${baseUrl}/v2/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "x-token": token,
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(`update failed: ${message}`);
    }
  },
  removeTodo: async (todoId, token, body) => {
    const response = await fetch(`${baseUrl}/v2/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "x-token": token,
      },
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(`remove failed: ${message}`);
    }
  }
});
