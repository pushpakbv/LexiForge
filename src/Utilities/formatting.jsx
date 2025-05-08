const getLastUpdatedText = (updatedAt) => {
  const updatedDate = new Date(updatedAt);
  const currDate = new Date();

  const minutesAgo = Math.floor((currDate - updatedDate) / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  } else {
    return `${daysAgo} days ago`;
  }
};

const getUpcomingText = (updatedAt) => {
  const updatedDate = new Date(updatedAt);
  const currDate = new Date();

  const minutesAgo = Math.floor((updatedDate - currDate) / (1000 * 60));
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  if (minutesAgo < 60) {
    return `${minutesAgo} minutes `;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hours `;
  } else {
    return `${daysAgo} days `;
  }
};

export { getLastUpdatedText, getUpcomingText };
