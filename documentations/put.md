
# [PUT](#PUT)

put [data](/documentation#data-types) for `/foo` in your json db

if the `/foo` existed so data will be updated.
else you will get an error with status code `404`


## Wich data will be update?
use filters to specify data must be update

for example:

`/users?query=age&equal=22` here only output of the filter will be updated.
`/db/users` here users will be updated.
`/db` here your json db will be updated.



## [Supported Filters](#supported-filters)

We support all the [filters](/documentation/get#filters).


## [Supported Data](#supported-data)

We support all the [data types](/documentation#data-types) that JSON supports.






