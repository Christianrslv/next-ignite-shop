import { styled } from '..';
export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 500,
})

export const Product = styled('a', {
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: '$gray800',

  img: {
    objectFit: 'cover',
    borderRadius: 8,
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1.5rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },


  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})