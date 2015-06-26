'use strict';

function formulario (form) {
  var boundary = 'GradualFormBoundary' + Math.random().toString(2).substr(2);
  var formData = form.tagName === 'FORM' ? readForm(form) : form;
  var body = encode(formData, boundary);
  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data; boundary=' + boundary
  };
  return { headers: headers, body: body };
}

function cast (collection) {
  var casted = [];
  for (var i = 0; i < collection.length; i++) {
    casted.push(collection[i]);
  }
  return casted;
}

function readForm (form) {
  var inputs = form.getElementsByTagName('input');
  var textareas = form.getElementsByTagName('textarea');
  return cast(inputs).concat(cast(textareas)).reduce(merge, {});
}

function merge (data, input) {
  var choice = input.type === 'checkbox' || input.type === 'radio';
  var value = input.value;
  var key = input.name;
  if (choice) {
    if (input.checked) {
      data[key] = value;
    } else if (!(key in data)) {
      data[key] = '';
    }
  } else if (key in data) {
    if (typeof data[key] === 'string') {
      data[key] = [data[key], value];
    } else {
      data[key].push(value);
    }
  } else {
    data[key] = value;
  }
  return data;
}

function encode (formData, boundary) {
  return Object.keys(formData).reduce(append, []).concat('--' + boundary + '--').join('\r\n');

  function append (encoded, key) {
    var name = key;
    var item = formData[key];
    var items = Array.isArray(item) ? item : [item];

    items.forEach(appendOne);

    function appendOne (value) {
      encoded.push('--' + boundary);
      encoded.push('content-disposition: form-data; name="' + name + '"');
      encoded.push('');
      encoded.push(value);
    }

    // TODO: handle file uploads

    return encoded;
  }
}

formulario.encode = encode;
module.exports = formulario;
