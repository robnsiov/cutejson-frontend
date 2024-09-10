
# [PUT](#PUT)

Update data in your JSON database for `/foo`.

If `/foo` exists, the data will be updated. Otherwise, you will receive an error with status code `404`.



## [Which Data Will Be Updated](#which-data-will-be-updated)?
Use filters to specify the data that should be updated.


For example:


`/users?query=age&equal=22` - Only the output of the filter will be updated.

`/db/users` - All users will be updated.

`/db` - Your Json DB will be updated.



## [Supported Filters](#supported-filters)

We support all the [filters](/documentation/get-started#filters).


## [Supported Data](#supported-data)

We support all the [data types](/documentation/get-started#data-types) that JSON supports.






