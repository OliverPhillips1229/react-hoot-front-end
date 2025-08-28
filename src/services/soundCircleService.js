// Match backend route defined in be/server.js: app.use("/sBytes", ...)
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/sBytes`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


const show = async (soundByteId) => {
  try {
    const res = await fetch(`${BASE_URL}/${soundByteId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const create = async (soundByteFormData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(soundByteFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createComment = async (soundByteId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${soundByteId}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteSoundByte = async (soundByteId) => {
  try {
    const res = await fetch(`${BASE_URL}/${soundByteId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const update = async (soundByteId, soundByteFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${soundByteId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(soundByteFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteComment = async (soundByteId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${soundByteId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const updateComment = async (soundByteId, commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${soundByteId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
    index, show, create, createComment, deleteSoundByte, update, deleteComment, updateComment,
};
