import  postgraphile  from 'postgraphile';

export const  post = postgraphile({
    database: 'users',
    user: 'refael',
    password: 'TsnsYeIeGjnc7K3kK3AG3dPIO0Et1JPu',
    host: 'dpg-cm3v0s8cmk4c73cg1hjg-a.oregon-postgres.render.com',
    port: 5432,
    ssl: true
},
    'public',
    {
        watchPg: false,
        graphiql: true,
        enhanceGraphiql: true,
        ownerConnectionString: 'owner',
    }
)