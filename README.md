# message.js
JavaScript library to create a windows metro style alert and modal box.

###Usage

Alert message:
```javascript
message.show("Hello World!");
```

Modal message:
```javascript
message.modal("Do you want to continue?",
                              function() {
                                 //TODO: handle OK action
                              });
```

