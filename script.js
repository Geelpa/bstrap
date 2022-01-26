//  PROGRAMAÇÃO ORIENTADA A OBJETOS //
const Modal = {
    toggle() {
        document
            .querySelector('.modal-overlay')
            .classList.toggle('hide')
    }
}
const Storage = {
    get() {
        return JSON.parse(localStorage.getItem('shortcuts')) || []
    },

    set(shortcuts) {
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts))
    }
}

const Shortcut = {
    all: Storage.get(),

    add(shortcut) {
        Shortcut.all.push(shortcut)

        App.reload()
    },

    remove(index) {
        Shortcut.all.splice(index, 1)

        App.reload()
    }
}

const DOM = {
    shortcutDocker: document.querySelector('#container_sc'),

    addShortcut(shortcut, index) {
        const sc = document.createElement('div');
        sc.setAttribute('class', 'shortcut_container')
        sc.innerHTML = DOM.innerHTML(shortcut, index)
        sc.dataset.index = index;

        DOM.shortcutDocker.appendChild(sc)
    },

    innerHTML(shortcut, index) {
        const html = `
            <div id="atalho" class="atalho bg-light rounded  add_btn mr-5" target="_blank">
                <a href="https://${shortcut.link}" class="position-relative">
                    <img src="https://picsum.photos/152/128" class="rounded-top">
                    <a href="#" class="position-absolute">
                        <img onclick="Shortcut.remove(${index})" src="./assets/minus.svg" class="minus delete_btn">
                    </a>
                    <div class="text-center p-1 mt-1">
                    <h5 class="weight-bold">${shortcut.name} </h5>
                </div>
                </a>
                
            </div>
        `
        return html
    },

    clearShortcuts() {
        DOM.shortcutDocker.innerHTML = ""
    }

}

const Form = {
    // Form: document.querySelector('#form'),
    name: document.querySelector('input#name'),
    link: document.querySelector('input#link'),

    getValues() {
        return {
            name: Form.name.value,
            link: Form.link.value,
        }
    },

    validateFields() {
        const { name, link } = Form.getValues()

        if (name.trim() === "" ||
            link.trim() === "") {
            throw new Error("Preencha todos os campos.")
        }
    },

    formatValues() {
        let { name, link } = Form.getValues()

        return {
            name,
            link
        }
    },

    clearFields() {
        Form.name.value = ""
        Form.link.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()

            const shortcut = Form.formatValues()

            Shortcut.add(shortcut)

            Form.clearFields()

            Modal.toggle()

        } catch (error) {
            alert(error.message)
        }
    }
}

const App = {
    init() {
        Shortcut.all.forEach(DOM.addShortcut)

        Storage.set(Shortcut.all)
    },

    reload() {
        DOM.clearShortcuts()
        App.init()
    }
}

App.init()