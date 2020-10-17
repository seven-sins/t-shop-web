const valid = args => {
    let rule = {};
    if (!args) {
        return rule;
    }
    if (args.required === true) {
        rule.required = true;
    }
    rule.rule = {
        validator: (value) => {
            let isValid = true;
            if (value) {
                if (args.min) {
                    if (value.length >= args.min) {
                        isValid = true;
                    } else {
                        isValid = false;
                    }
                }
                if (args.max) {
                    if (value.length >= args.min && value.length <= args.max) {
                        isValid = true;
                    } else {
                        isValid = false;
                    }
                }
                if (args.length){
                    if(value.length == args.length){
                        isValid = true;
                    } else{
                        isValid = false;
                    }
                }
            }
            return isValid;
        },
        message: args.message ? args.message: "数据格式不正确 "
    }

    return rule;
}

export default valid;