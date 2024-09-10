
# [DELETE](#DELETE)
Delete data from `/foo` in your json DB.

If `/foo` exists, the data will be deleted. Otherwise, you will receive an error with status code `404`.



## Which Data Will Be Deleted?
Use filters to specify the data that should be deleted.


For example:


`/db/users?query=age&equal=22`  - Only the output of the filter will be deleted.

`/db/users` - All users will be deleted.

`/db` Your JSON DB will be deleted.



## [Supported Filters](#supported-filters)

We support all the [filters](/documentation/get-started#filters).


## [Supported Data](#supported-data)

We support all the [data types](/documentation/get-started#data-types) that JSON supports.
