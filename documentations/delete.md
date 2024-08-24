
# [DELETE](#DELETE)
delete data for `/foo` in your json db

if the `/foo` existed so data will be deleted.
else you will get an error with status code `404`


## Wich data will be deleted?
use filters to specify data must be delete

for example:

`/db/users?query=age&equal=22` here only output of the filter will be delete.
`/db/users` here users will be delete.
`/db` here your json db will be delete.



## [Supported Filters](#supported-filters)

We support all the [filters](/documentation/get#filters).


## [Supported Data](#supported-data)

We support all the [data types](/documentation#data-types) that JSON supports.






