export const storeState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
    return true;
  }
  catch(e) {
    return false;
  }
}

export const restoreState = (key, defaultState) => {
  try {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultState;
  }
  catch(e) {
    return defaultState;
  }
}
