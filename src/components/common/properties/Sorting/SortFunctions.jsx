export const time = (data, direction) =>
  data.sort((a, b) => {
    const first = new Date(a.createdAt);
    const second = new Date(b.createdAt);

    const x = direction === 'asc' ? second : first;
    const y = direction === 'asc' ? first : second;

    if (x < y) return -1;
    if (x > y) return 1;

    return 0;
  });

export const alphabetic = (data, direction) =>
  data.sort((a, b) => {
    const first = a.name.toLowerCase();
    const second = b.name.toLowerCase();

    const x = direction === 'asc' ? first : second;
    const y = direction === 'asc' ? second : first;

    if (x < y) return -1;
    if (x > y) return 1;

    return 0;
  });

export const price = (data, direction) =>
  data.sort((a, b) => {
    const first = Number(a.price);
    const second = Number(b.price);

    const x = direction === 'asc' ? second : first;
    const y = direction === 'asc' ? first : second;

    if (x < y) return -1;
    if (x > y) return 1;

    return 0;
});

export const newestFirst = (data) =>
  data.sort((a, b) => {
    const first = new Date(a.createdAt);
    const second = new Date(b.createdAt);    

    if (x < y) return -1;
    if (x > y) return 1;

    return 0;
  });
