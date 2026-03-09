const IpuEl= document.getElementById('Ipu-el')
const ConsEl = document.getElementById('Cons-el')
const WathEl =  document.getElementById('watch-el')
const XekEl = document.getElementById('xek-el')


let Coctav = []
function Updatehas(){
    const now= new Date() // Текущее время через объект Date()
    // const month = now.getMonth()
    // const monthTitle = [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const day = now.getDay()
    const dayTitle = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    const haours = now.getHours().toString().padStart(2, '0')
    const minst= now.getMinutes().toString().padStart(2, '0')
    WathEl.textContent = `${dayTitle[day]}  ${haours}:${minst}`
}
Updatehas()
setInterval(Updatehas,1000)
function Note (){
    const saved = localStorage.getItem('myNote') // хранилище в браузере, которое позволяет сохранять данные между перезагрузками страницы
    if (saved) {
        Coctav = JSON.parse(saved) // преоброзование в обЪект строки JSON
    }
}
Note()
function saveNote(){
    localStorage. setItem('myNotes', JSON.stringify(Coctav))//  преобразования объекта в строку нужно использовать JSON.stringify
}
// Время внутри заметок
function formTime(times){
    const a= new Date(times)
        const day = a.getDay()
    const dayTitle = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    const haours = a.getHours().toString().padStart(2, '0')
    const minst= a.getMinutes().toString().padStart(2, '0')
    return `${dayTitle[day]}  ${haours}:${minst}`
}
function renderNotes() {
     if (Coctav.length === 0) {
        ConsEl.innerHTML = '<div class="empty-state">📭 Пока нет заметок</div>';
            return;
            }

        // Сортировка
    Coctav.sort((a, b) => b.timestamp - a.timestamp);

    let html = '';

    for (let i = 0; i < Coctav.length; i++) {
        const note = Coctav[i];
            html += `
             <div class="note-item" data-id="${note.id}">
                 <div class="note-content">
                    <div class="note-text">${note.text}</div>
                    <span class="note-time"> ${formTime(note.timestamp)}</span>
                    </div>
                 <button class="delete-btn" title="Удалить">✕</button>
             </div>`;
            }

    ConsEl.innerHTML = html;
        }

// ДОБ Н ЗАМЕТКИ
function addNote() {
    const text = IpuEl.value.trim();

    if (text === '') {
        alert('Напишите что-нибудь!');
        return;
            }

            //  новую 
        const newNote = {
            id: Date.now(), 
            text: text,
            timestamp: Date.now() // время создания
            };

        Coctav.push(newNote);
        saveNote();
        renderNotes();
        IpuEl.value = ''; // очищаем поле
        }

        // УДАЛЕНИЕ ЗАМЕТКИ
        function deleteNote(id) {
            Coctav = Coctav.filter(note => note.id != id);
            saveNote();
            renderNotes();
        }

        // СТАРТ
        Note();
        renderNotes();
        XekEl.addEventListener('click', addNote);


        IpuEl.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addNote();
            }
        });

        ConsEl.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete-btn')) {
                const noteItem = e.target.closest('.note-item');
                if (noteItem) {
                    const id = noteItem.dataset.id;
                    deleteNote(id);
                }
            }
        });