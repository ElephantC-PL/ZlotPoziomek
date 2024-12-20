let set;
//set = 'local';
set = 'public';

export const API_URL = set === 'local' ? 'http://localhost:3000' : "http://elephantc.api.kubaadamczyk.pl";