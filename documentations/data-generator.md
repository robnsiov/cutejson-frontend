
# [Data Generator](#data-generator)
Generate fake data using [Faker.js](https://fakerjs.dev).

To create fake data, go to the **Json Editor** tab and click on **Generate fake data**.

For example, if (repeat: 2):


```
{
  name: "{{person.lastName}}",
  bio: "{{person.bio}}",
  gender: "{{person.gender}}",
  phone: "{{phone.number}}",
  ip: "{{internet.ipv4}}",
  city: "{{location.city}}",
  country: "{{location.country}}",
}
```

and the output will be :

```
[
    {
    "name": "Friesen",
    "bio": "public speaker, founder, geek",
    "gender": "Cisgender",
    "phone": "(555) 200-4060 x4456",
    "ip": "209.210.59.34",
    "city": "Port Terranceburgh",
    "country": "New Zealand"
  },
  {
    "name": "Mayert",
    "bio": "tradition lover",
    "gender": "Female to male trans man",
    "phone": "1-774-479-7322",
    "ip": "205.65.220.34",
    "city": "Hillltown",
    "country": "Albania"
  }
]
```


## [Supported templates](#supported-templates)
We support all of the [Fakerjs templates](https://fakerjs.dev/api/)





