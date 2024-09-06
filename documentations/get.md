
# [GET](#GEt)

Cute Json is a **free** tool designed for development environments. The goal behind creating Cute json was to provide a simple environment for developing web services without requiring backend skills.

## [Sample Data](#sample-data)

This is a sample data.

We support all of the structures defined in the json below:


```
{
  "users": [
    {
      "age": 22,
      "name": "john",
      "email": "john@example.com",
      "comments": [1, 20],
      "address": { "country": "USA" },
      "admin": false
    },
    {
      "age": 30,
      "name": "sara",
      "email": "sara@example.com",
      "comments": [3],
      "address": { "country": "UK" },
      "admin": true
    }
  ],
  "user_comments": [
    { "id": 1, "content": "this is a comment from sara" },
    { "id": 2, "content": "this is another comment from sara" },
    { "id": 3, "content": "this a comment from john" }
  ]
}

```

## [Get DB](#get-db)

If you want to get your DB (all of the json), just use `https://api.cutejson.dev/db`.


## [End-points](#end-points)
Each key in your json DB is an endpoint and you can run [supported http methods](https://api.gamecurrency.dev/documentation#methods) on it.


For example, in the sample data, the endpoints are:


```https://api.cutejson.dev/db/users```

```https://api.cutejson.dev/db/comments```

```https://api.cutejson.dev/db/prices```

```https://api.cutejson.dev/db/sizes```

```https://api.cutejson.dev/db/verification```

```https://api.cutejson.dev/db/hasColor```


## [How Filters Work](#how-filters-work)
We have several filters that you can use with the `GET`, `PUT`, and `DELETE` methods.


### Filters do not work with the POST method.


Filters work like this:

```https://api.cutejson.dev/db/users?query=X&filter1=q1,Y&filter2=q2,Z```


If the output of `/users` is:

1- An ```array of objects``` :


1.1- If you include `query=X`, all filters will apply to **X**.

 for example ```https://api.cutejson.dev/db/users?query=name&equal=john``` Here, the `equal` filter is applied to **name**.

1.2- If you do not include `query=X`, you must provide a second parameter for each filter.

 Here, the `equal` filter is applied to **name** and the `gt` (greater than) filter is applied to **age**.

1.3- You can include `query=X` and still use a second parameter for each filter.

for example ```https://api.cutejson.dev/db/comments?query=address.country&startsWith=sa,name&equal=1,id&length=2``` Here, the `startsWith` filter is applied to **name**, the `equal` filter is applied to **id**, and the `length` filter is applied to **address.country**.



2- If the output of `/prices` is an **array of numbers** or an **array of strings**:

2.1 You do not need to include `query=X` or a second parameter for each filter.

for example ```https://api.cutejson.dev/db/prices?lt=20``` Here, the `lt` (less than) filter is applied to your **array**.


for example ```https://api.cutejson.dev/db/sizes?endsWith=xl``` Here, the `endsWith` filter is applied to your **array**.

3- If the output of `/verification` is boolean or null:

3.1 Filters do not work on boolean or null outputs. They only work on **arrays of objects**, **numbers**, or **strings**.

### Note 1:
"Output" refers to the endpoint's response.


### Note 2:
You can filter a boolean property like admin in the sample data.



For example: ```https://api.cutejson.dev/db/users?query=admin&equal=1```



## [Filters](#filters)

```startsWith``` 

```endsWith``` 

```strictEqual``` => ```?query=age&strictEqual=20``` searchs for 20 as **string**

```equal``` => ```?query=age&strictEqual=20``` searchs for 20 as **string** or **number**

```strictNotEqual``` 

```notEqual``` 

```page``` => ```?page=10,1``` The first parameter is the limit (default=10), and the second is the offset (default=0)

```sort``` => ```?sort=name``` | ```?sort=-age``` | ```?sort=-amount.price```

```gt``` 

```gte``` 

```lt``` 

```lte```

```contains``` => ```?contains=JA,name```

```length``` => ```?query=content&length=2000```

```regex``` => ```?regex=^S,category``` searches for "S" at the beginning of the **category**

```noSelect``` => ```?noSelect=password,confirmPassword```

```populate``` => ```?query=comments&populate=user_comments,id```

#### Note:
All methods support nested parameters => `?query=category.title&equal=pc&lt=1500,price.amount.value`

