export interface IModalOptions {
   btnId: string;
   modalId: string;
   modalTitleId: string;
   modalTitle: string;
   modalBody: JSX.Element;
   // btnCloseId: string;
   // btnCloseText: string;
   btnCloseClick: React.MouseEventHandler<HTMLButtonElement>;
   // btnFooterClick: React.MouseEventHandler<HTMLButtonElement>;
   btnFooter: JSX.Element | null;
}
