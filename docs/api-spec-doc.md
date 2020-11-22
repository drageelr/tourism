# Tourism App - API Specification Document

## Important Notes
- Every **Response Object** will contain `{statusCode: Number, statusName: "String", message: "String"}` in addition to the mentioned object.
- All APIs where **Acess** feild is not **-** must send the `token`  as *"Authorization"* header with every request.

## APIs

### 1. Authentication
|#|Name|Description|Route|Request Object|Request Type|Response Object (Success)|Access|
|-|----|-----------|-----|------------|--------------|-------------------------|------|
|1|Admin Login|Authentication for Admins|`/api/auth/admin/login`|`loginObj`|POST|`{token: "String", user: adminObj}`|-|
|2|Customer Login|Authentication for Customers|`/api/auth/customer/login`|`loginObj`|POST|`{token: "String", user: customerObj}`|-|

- **Note: * means the field mentioned is required (For `Request Object`)**

#### Object Schema
|#|Name|Object|
|-|----|------|
|1|`loginObj`|`{email*: "String - must be email", password*: "String-min(8)-max(30)-[a-zA-Z0-9]"}`|
|2|`adminObj`|`{id: Number, firstName: "String", lastName: "String", permission: {manageAdmins: Boolean, manageTrips: Boolean, manageReqList: Boolean, manageReports: Boolean}}`|
|3|`customerObj`|`{id: Number, firstName: "String", lastName: "String"}`|

### 2. Account Management
|#|Name|Description|Route|Request Object|Request Type|Response Object (Success)|Access|
|-|----|-----------|-----|------------|--------------|-------------------------|------|
|1|Create Admin|Creates a record for a potential admin|`/api/account/admin/create`|`{email*: "String - must be email}`|POST|-|`Admin`|
|2|Admin Sign Up|Signs up admin|`/api/account/admin/signup`|`adminSignUpObj`|POST|-|`Potential Admin`|
|3|Customer Sign Up|Signs up customer|`/api/account/customer/signup`|`customerSignUpObj`|POST|-|-|
|4|Fetch Admins|Retrieves Admin(s) based on an optional criteria|`/api/account/admin/fetch`|`adminFetchCriteriaObj`|POST|`{admins: [adminFetchCriteriaObj]}`|`Admin`|
|5|Fetch Customers|Retrieves Customer(s) based on an optional criteria|`/api/account/customer/fetch`|`customerFetchCriteriaObj`|POST|`{customers: [customerFetchCriteriaObj]}`|`Admin`|
|6|Edit Admin|Edits the Admin field(s) provided in the request|`/api/account/admin/edit`|`adminEditObj`|POST|-|`Admin`|
|7|Edit Customer|Edits the Customer field(s) provided in the request|`/api/account/customer/edit`|`customerEditObj`|POST|-|`Admin`|
|8|Admin Forgot Password Request|Sends email to Admin containing a link to reset password|`/api/account/admin/forgot-password/req`|`{email*: "String - must be email}`|POST|-|-|
|9|Customer Forgot Password Request|Sends email to Customer containing a link to reset password|`/api/account/customer/forgot-password/req`|`{email*: "String - must be email}`|POST|-|-|
|10|Admin Forgot Password Reset|Resets the password of Admin|`/api/account/admin/forgot-password/res`|`{password: "String-min(8)-max(30)-[a-zA-Z0-9]"}`|POST|-|`Admin`|
|11|Customer Forgot Password Reset|Resets the password of Customer|`/api/account/customer/forgot-password/res`|`{password: "String-min(8)-max(30)-[a-zA-Z0-9]"}`|POST|-|`Customer`|
|12|Admin Change Password|Changes the password of Admin (old password must be provided)|`/api/account/admin/change-password`|`changePassObj`|POST|-|`Admin`|
|13|Customer Change Password|Changes the password of Customer (old password must be provided)|`/api/account/customer/change-password`|`changePassObj`|POST|-|`Customer`|

- **Note: * means the field mentioned is required (For `Request Object`)**

#### Object Schema
|#|Name|Object|
|-|----|------|
|1|`adminSignUpObj`|`{firstName*: "String", lastName*: "String", password: "String-min(8)-max(30)-[a-zA-Z0-9]"}`|
|2|`customerSignUpObj`|`{email*: "String - must be email", firstName*: "String", lastName*: "String", password: "String-min(8)-max(30)-[a-zA-Z0-9]"}`|
|3|`adminFetchCriteriaObj`|`{id: Number, email: "String - must be email", firstName: "String", lastName: "String", active: Boolean, permission: {manageAdmins: Boolean, manageTrips: Boolean, manageReqList: Boolean, manageReports: Boolean}}`|
|4|`customerFetchCriteriaObj`|`{id: Number, email: "String - must be email", firstName: "String", lastName: "String", active: Boolean}`|
|5|`adminEditObj`|`{email: "String - must be email", firstName: "String", lastName: "String", password: "String-min(8)-max(30)-[a-zA-Z0-9]", active: Boolean, permission: {manageAdmins: Boolean, manageTrips: Boolean, manageReqList: Boolean, manageReports: Boolean}}`|
|6|`customerEditObj`|`{email: "String - must be email", firstName: "String", lastName: "String", password: "String-min(8)-max(30)-[a-zA-Z0-9]", active: Boolean}`|
|7|`changePassObj`|`{oldpassword*: "String-min(8)-max(30)-[a-zA-Z0-9]", newpassword*: "String-min(8)-max(30)-[a-zA-Z0-9]"}`|

### 3. Location Management
|#|Name|Description|Route|Request Object|Request Type|Response Object (Success)|Access|
|-|----|-----------|-----|------------|--------------|-------------------------|------|
|1|Create Location|Creates a Location|`/api/location/create`|`locationCreateObj`|POST|`{id: Number}`|`Admin`|
|2|Fetch Locations|Retrieves Location(s) based on an optional criteria|`/api/location/fetch`|`locationFetchCriteriaObj`|POST|`{locations: [locationFetchCriteriaObj]}`|-|

- **Note: * means the field mentioned is required (For `Request Object`)**

#### Object Schema
|#|Name|Object|
|-|----|------|
|1|`locationCreateObj`|`{site*: "String", city*: "String", province*: "String"}`|
|2|`locationFetchCriteriaObj`|`{id: Number, site: "String", city: "String", province: "String"}`|


### 4. Trip Management
|#|Name|Description|Route|Request Object|Request Type|Response Object (Success)|Access|
|-|----|-----------|-----|------------|--------------|-------------------------|------|
|1|Create Trip|Creates a Trip|`/api/trip/create`|`tripCreateObj`|POST|`{id: Number}`|`Admin`|
|2|Fetch Trips|Retrieves Trip(s) based on an optional criteria|`/api/trip/fetch`|`tripFetchCriteriaObj`|POST|`[tripFetchCriteriaObj]`|-|
|3|Edit Trip|Edits the Trip field(s) provided in the request|`/api/trip/edit`|`tripEditObj`|POST|-|`Admin`|

- **Note: * means the field mentioned is required (For `Request Object`)**

#### Object Schema
|#|Name|Object|
|-|----|------|
|1|`tripCreateObj`|`{name*: "String", description*: "String", itienrary*: "String", price*: Number, capacity*: Number, startDate*: DateTime, endDate*: DateTime, locationIDs*: [Number]}`|
|2|`tripFetchCriteriaObj`|`{id: Number, name: "String", description: "String", itienrary: "String", price: Number, capacity: Number, startDate: DateTime, endDate: DateTime, locationIDs: [Number]}`|
|3|`tripEditObj`|`{id*: Number, name: "String", description: "String", itienrary: "String", price: Number, capacity: Number, startDate: DateTime, endDate: DateTime, locationIDs: [Number]}`|

### 5. Trip Request Management
|#|Name|Description|Route|Request Object|Request Type|Response Object (Success)|Access|
|-|----|-----------|-----|------------|--------------|-------------------------|------|
|1|Create Trip Request|Creates a Trip Request|`/api/trip-req/create`|`tripCreateObj`|POST|`{id: Number}`|`Customer`|
|2|Fetch Trip Requests|Retrieves Trip Request(s) based on an optional criteria|`/api/trip-req/fetch`|`tripreqFetchCriteriaObj`|POST|`[tripreqFetchCriteriaObj]`|`Admin`|
|3|Fetch Customer Trip Requests|Retrieves Trip Request(s) based on an optional criteria for the Customer executing this request|`/api/trip-req/fetch-customer`|`tripreqFetchCriteriaObj2`|POST|`[tripreqFetchCriteriaObj]`|`Customer`|
|4|Edit Trip Request|Edits the Trip Request field(s) provided in the request|`/api/trip-req/edit`|`tripreqEditObj`|POST|-|`Admin`|

- **Note: * means the field mentioned is required (For `Request Object`)**

#### Object Schema
|#|Name|Object|
|-|----|------|
|1|`tripreqCreateObj`|`{tripID*: Number, customerID*: Number, code: "String", numberOfPeople*: Number}`|
|2|`tripreqFetchCriteriaObj`|`{id: Number, tripID: Number, customerID: Number, code: "String", numberOfPeople: Number, amountDue: Number, accepted: Boolean}`|
|3|`tripreqFetchCriteriaObj2`|`{id: Number, tripID: Number, code: "String", numberOfPeople: Number, amountDue: Number, accepted: Boolean}`|
|4|`tripreqEditObj`|`{id*: Number, numberOfPeople: Number, amountDue: Number, accepted: Boolean}`|

### 6. Promo Code Management
|#|Name|Description|Route|Request Object|Request Type|Response Object (Success)|Access|
|-|----|-----------|-----|------------|--------------|-------------------------|------|
|1|Create Promo Code|Creates a Promo Code|`/api/code/create`|`codeCreateObj`|POST|-|`Admin`|
|2|Fetch Promo Code|Retrieves Promo Code(s) based on an optional criteria|`/api/code/fetch`|`codeFetchCriteriaObj`|POST|`[codeFetchCriteriaObj]`|`Admin`|
|3|Delete Promo Code|Deletes a Promo Code|`/api/code/delete`|`{id*: Number}`|POST|-|`Admin`|

- **Note: * means the field mentioned is required (For `Request Object`)**

#### Object Schema
|#|Name|Object|
|-|----|------|
|1|`codeCreateObj`|`{code*: "String", maxDiscount*: Number, discountPercentage*: Number}`|
|2|`codeFetchCriteriaObj`|`{code: "String", maxDiscount: Number, discountPercentage: Number}`|

### 7. Finance Management
|#|Name|Description|Route|Request Object|Request Type|Response Object (Success)|Access|
|-|----|-----------|-----|------------|--------------|-------------------------|------|
|1|Fetch Monthly Statement|`/api/finance/monthly`|-|POST|-|`Admin`|
|2|Fetch Yearly Statement|`/api/finance/yearly`|-|POST|-|`Admin`|

## Status Codes
**Note: These status codes have been altered for use in CMS. For further elaboration visit this [link.](https://restfulapi.net/http-status-codes/)**
### 1. Sucess
|#|Name|Code|Description|
|-|----|----|-----------|
|1|`OK`|`200`|<ul><li>Action requested by client successfully carried out.</li></ul> <ul><li>No other specific code in `2xx` series is appropriate.</li></ul> <ul><li>**Always has a response body** (apart from `status` and `message`).</li></ul>|
|2|`CREATED`|`201`|<ul><li>A resource is created inside a collection.</li></ul> <ul><li>Always returns this code **only after** successful creation of the resource.</li></ul>|
|3|`ACCEPTED`|`202`|<ul><li>Request has been accepted, but will be processed later on.</li></ul> <ul><li>Always returns this code **before execution** of requested process.</li></ul>|
|4|`NO CONTENT`|`203`|<ul><li>Action requested by client successfuly carried out.</li></ul> <ul><li>**Never returns a response body** (apart from `status` and `message`).</li></ul>|

### 2. Redirection
|#|Name|Code|Description|
|-|----|----|-----------|
|1|`MOVED PERMANENTLY`|`301`|<ul><li>API shifted to **new URI**.</li></ul> <ul><li>Always returns **new URI** in response body(apart from `status` and `message`).</li></ul>|
|2|`SEE OTHER`|`303`|<ul><li>Controller resource has finished it's work, but the **response is on some other URI** sent in response body (apart from `status` and `message`).</li></ul>|
|3|`NOT MODIFIED`|`304`|<ul><li>Resource has not been modified since the version specified by the request.</li></ul> <ul><li>**Never returns a response body** (apart from `status` and `message`).</li></ul>|
|4|`TEMPORARY REDIRECT`|`307`|<ul><li>Client's request woudl not be processed **since URI has temporarily been changed**.</li></ul> <ul><li>Always returns **temporary URI** in response body(apart from `status` and `message`).</li></ul>|

### 3. Client Error
|#|Name|Code|Description|
|-|----|----|-----------|
|1|`BAD REQUEST`|`400`|<ul><li>Generic client-side error status.</li></ul> <ul><li>No other specific code in `4xx` series is appropriate.</li></ul>|
|2|`UNAUTHORIZED`|`401`|<ul><li>Client request to a resource without proper authorization - **either no or wrong credentials.**</li></ul>|
|3|`FORBIDDEN`|`403`|<ul><li>Client doesn't have access to the requested resource.</li></ul>|
|4|`NOT FOUND`|`404`|<ul><li>Invalid URI (API Route).</li></ul>|
|5|`NOT ACCEPTABLE`|`406`|<ul><li>API can't generate client's preffered media type.</li></ul>|
|6|`UNSUPPORTED MEDIA TYPE`|`415`|<ul><li>API can't process client's supplied media type.</li></ul>|

### 4. Server Error
|#|Name|Code|Description|
|-|----|----|-----------|
|1|`INTERNAL SERVER ERROR`|`500`|<ul><li>Error occured at sever side - not the client's fault.</li></ul>|
|2|`NOT IMPLEMENTED`|`501`|<ul><li>API not implemented but exists.</li></ul>|

### 5. Misc
|#|Name|Code|Description|
|-|----|----|-----------|
|1|`NOT A STATUS CODE`|`any number apart from ones mentioned above`|<ul><li>Error Code not available.</li></ul>|

## Error Objects
### Introduction
Error object standard:
```javascript=1
{
name: "String",
details: object/"String"/Number
}
```
Hence, standard error output:
```javascript=1
{
statusCode: Number, 
statusName: "String", 
message: "String", 
error: {
    name: "String", 
    details: object/"String"/Number
  }
}
```