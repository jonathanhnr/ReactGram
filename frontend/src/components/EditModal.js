import * as Dialog from '@radix-ui/react-dialog';
import "./EditModal.css"
const EditModal =  ({image,onClose}) => (
  <Dialog.Root
    open={true}
    onOpenChange={newOpen => {
    if (!newOpen) {
      onClose();
    }
  }}
  >
    <Dialog.Trigger />
    <Dialog.Portal>
      <Dialog.Overlay className={"DialogOverlay"}/>
      <Dialog.Content className={"DialogContent"}>
       <div> opa
         <img src={image} alt=' ' />
       </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default EditModal;