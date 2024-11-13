let set: ('local'|'public');
set = 'local';
//set = 'public';

export const ApiUrl = set === 'local' ? 'http://localhost:3000' : "http://api.zlotpoziomek.pl";