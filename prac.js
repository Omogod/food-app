let a = Math.floor(Math.random() * 9000)
console.log(atob)

// 0 -> 1 -> 2 -> 3 -> 4 -> 5
// null <- 0 <- 1 -> 2 -> 3 -> 4 -> 5
// function reversedLinkedList(head) {
//     let previous = null
//     let current = head

//     while(current) {
//     let next = current.next
//     current.next = previous; 
//     previous = current
//     current = next
//     }

//   return previous
// }


function reversedLinkedList(head) {
    let previous = null
    let current = head;

    while(current) {
        let next = current.next
        current.next = previous
        previous = current
        current = next
    }
}