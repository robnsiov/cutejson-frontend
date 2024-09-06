

# [Cute Json](#cute-json)

Cute JSON is a **free** tool designed for **development environments**. The goal behind creating Cute JSON was to provide a simple environment for developing web services without requiring backend skills.

In Cute JSON, everything is free. You just need to go to the **Json Editor** tab and define your JSON. All keys instantly become endpoints.

## [Methods](#methods)
we supports `GET`, `POST`, `PUT` and `DELETE`.

## [Data Types](#data-types)
We support all the data types that JSON supports.

`String`, `Number`, `Object`, `Boolean`, `Array` and `Null`

You can use complex data types like arrays of objects, nested objects, arrays of numbers, and more. However, we recommend using **arrays of objects** to avoid issues when filtering data.


## [Live Editor](#live-editor)
You can edit the JSON code live and immediately check all the methods and endpoints from the right panel to see their outputs in real time.


## [Filters](#filters)

We've tried to prepare all the necessary filters, such as `startsWith`, `equal`, `sort`, `gte`, `contains`, `regex`, `populate`, `pagination` and others, so that you can get a true experience and quickly and easily build your database and use it in your development environment in a fraction of a second.

## [Pricing](#pricing)

Everything is free and unlimited. Make unlimited requests and create up to 1MB of JSON data.



## [External Projects](#external-projects)

For use in external projects, you only need to add the `cute-json-token` header to be able to use the web services.

To view the list of web services, go to the **JSON Editor** tab and click on the **APIs List**.

### NOTE:

##### Cute JSON is designed exclusively for development environments and is not suitable for use in production.
---
# [Get Started](#get-started)

#### To get started, just follow the steps below.

1- Add `cute-json-token: X` header in your fetching library.

Axios
```
axios.defaults.headers.common['cute-json-token'] = 'X';
axios.get('https://api.cutejson.dev/db/posts')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

Fetch

```
fetch('https://api.cutejson.dev/db/posts', {
    method: 'GET',
    headers: {
        'cute-json-token': 'X'
    }
})
```

Flutter (Dart) using http package

```
http.get(
    Uri.parse('https://api.cutejson.dev/db/posts'),
    headers: {'cute-json-token': 'X'},
  );
```

Android

```
URL url = new URL("https://api.cutejson.dev/db/posts");
HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
urlConnection.setRequestMethod("GET");
urlConnection.setRequestProperty("cute-json-token", "X");
```

2- There’s nothing more to do. Just use one of the keys you’ve defined in your JSON.

For example: `GET`, `POST`, `PUT`, `DELETE`

`https://api.cutejson.dev/db/user`


`https://api.cutejson.dev/db/posts?query=title&eqaul=FC25`


`https://api.cutejson.dev/db/products?contains=description,FC25&regex=company,^Foo`

`https://api.cutejson.dev/db/books?query=price&lt=12000&page=20,40`

`https://api.cutejson.dev/db/comments?query=comments&populate=user_comments,id`


